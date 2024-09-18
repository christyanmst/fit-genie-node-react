import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useContext, useState } from "react";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";

interface ModalEditUserProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setUserImage: (image: any) => void;
  base64Image: any;
}

Modal.setAppElement("#__next");

export function ModalEditUser({
  isOpen,
  onRequestClose,
  base64Image,
  setUserImage,
}: ModalEditUserProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<any>(base64Image);

  const { user } = useContext(AuthContext);

  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1c1b1f",
      borderRadius: '20px',
    },
  };

  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleUpdatePhoto = async () => {
    try {
      if (!user) return;
      if (!selectedImage) {
        onRequestClose();
        return;
      }

      const formData = new FormData();
      formData.append("userId", String(user.id));
      formData.append("file", selectedImage);

      await api.post("/users/update-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUserImage(selectedImageUrl);

      toast.success("Foto atualizada com sucesso");
      onRequestClose();
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível atualizar a foto");
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = await convertBlobToBase64(file);

      setSelectedImageUrl(imageUrl);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        className="react-modal-close"
        onClick={onRequestClose}
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34738" />
      </button>

      <div className={styles.containerModal}>
        <h2>Editar Foto</h2>
        <div className={styles.profileImageModalContent}>
          <div className={styles.profileImageModalBorder}>
            <Image
              src={selectedImageUrl || "/default-avatar.png"}
              alt="User Photo"
              width={220}
              height={220}
              className={styles.profileImageModalPhoto}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className={styles.modalButtons}>
            <Button
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {" "}
              Alterar imagem
            </Button>
            <Button onClick={handleUpdatePhoto}>Salvar</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
