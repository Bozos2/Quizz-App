import React, { useState } from "react";
import { useSelector } from "react-redux";
import NotificationModal from "../utils/NotificationModal";

import i1 from "../assets/Avatars/001.jpg";
import i2 from "../assets/Avatars/002.jpg";
import i3 from "../assets/Avatars/003.jpg";
import i4 from "../assets/Avatars/004.jpg";
import i5 from "../assets/Avatars/005.jpg";
import i6 from "../assets/Avatars/008.jpg";
import i7 from "../assets/Avatars/009.jpg";
import i8 from "../assets/Avatars/010.jpg";
import i9 from "../assets/Avatars/011.jpg";
import i10 from "../assets/Avatars/012.jpg";
import i11 from "../assets/Avatars/013.jpg";
import i12 from "../assets/Avatars/015.jpg";
import i13 from "../assets/Avatars/016.jpg";
import i14 from "../assets/Avatars/022.jpg";
import i15 from "../assets/Avatars/023.jpg";
import i16 from "../assets/Avatars/024.jpg";

const SetAvatar = (props) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const Id = useSelector((state) => state.auth.id);

  const avatars = [
    i1,
    i2,
    i3,
    i4,
    i5,
    i6,
    i7,
    i8,
    i9,
    i10,
    i11,
    i12,
    i13,
    i14,
    i15,
    i16,
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    console.log(selectedAvatar);
  };

  console.log("provjera avatara:", selectedAvatar);

  const handleSaveClick = async (event) => {
    event.preventDefault();

    if (!Id) {
      return;
    }

    let formData = null;

    if (selectedAvatar !== null) {
      formData = {
        avatar_id: selectedAvatar,
      };
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/editprofile/${Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      console.log("response:", responseData);

      const { err, msg } = responseData;

      if (err) {
        throw new Error("Error:" + msg);
      } else {
        console.log("Uspješno ažurirano:", msg);
      }
    } catch (error) {
      console.log("Greška:", error);
    }
    props.onClose();
  };

  return (
    <>
      <NotificationModal
        avatars={avatars}
        title="Change your avatar!"
        messages="Please select one of these Avatars"
        onConfirm={handleSaveClick}
        onClickHandler={handleAvatarClick}
        isClicked={selectedAvatar}
        buttonTitle="Save"
      />
    </>
  );
};

export default SetAvatar;
