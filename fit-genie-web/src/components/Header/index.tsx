import styles from "./styles.module.scss";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ModalEditUser } from "./ModalEditUser";
import { api } from "@/services/apiClient";

export function Header() {
  const { signOut } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { user } = useContext(AuthContext);

  async function getImage() {
    if (!user) return;
    try {
      const image = await api.get(`/users/get-photo/${user.id}`);
      // setImage(image);
      // const imageUrl = convertBlobToBase64(image);

    const buffer = image.data.data;
    const byteArray = new Uint8Array(buffer);
    
    const base64String = btoa(
      byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const imageUrl = `data:image/png;base64,${base64String}`;
    setImageUrl(imageUrl);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImage();
  }, [user])

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={"/dashboard"}>
          <Image src="/logo.svg" alt="Logo Fit Genie" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href={"/trainingSheets"}>
            <span>Fichas de Treino</span>
          </Link>

          <div className={styles.profileIcon} onClick={() => setIsModalOpen(true)}>
            <Image 
              src={imageUrl ?? '/default-avatar.png'}
              alt="User Photo" 
              width={40} 
              height={40} 
              className={styles.profileImage} 
            />
          </div>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
      {isModalOpen && <ModalEditUser isOpen={isModalOpen} setUserImage={setImageUrl} onRequestClose={() => setIsModalOpen(false)} base64Image={imageUrl} />}
    </header>
  );
}
