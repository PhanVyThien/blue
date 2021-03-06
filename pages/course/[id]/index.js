import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutate } from "restful-react";
import Image from "next/image";
import { faHome, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 12px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5035/courses");
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5035/courses/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

function Form({ item }) {
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState(item.Name);
  const [description, setDescription] = useState(item.Description);
  const [sex, setSex] = useState(item.Sex);
  const [dateIn, setDateIn] = useState(item.DateIn);
  const [age, setAge] = useState(item.age);
  const [price, setPrice] = useState(item.Price);
  const [enteringQuantity, setEnteringQuantity] = useState(
    item.enteringQuantity
  );
  const [colors, setColors] = useState(["yellow", "blue", "red"]);
  const [selectedColors, setSelectedColors] = useState(item.colors);
  const [sizes, setSizes] = useState(["L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState(item.size);
  const [materials, setMaterials] = useState(["Cotton", "Thun", "Nilon"]);
  const [selectedMaterials, setSelectedMaterials] = useState(item.materials);

  const [soldQuantity, setSoldQuantity] = useState(item.soldQuantity);
  const [selectedImage, setSelectedImage] = useState(item.Image);
  const [isSucceed, setIsSucceed] = useState("");
  const [imageChange, setImageChange] = useState(false);

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "description") {
      setDescription(value);
    } else if (name == "sex") {
      setSex(value);
    } else if (name == "price") {
      let tmp = parseInt(value);
      setPrice(tmp);
    } else if (name == "enteringQuantity") {
      let tmp = parseInt(value);
      setEnteringQuantity(tmp);
    } else if (name == "age") {
      setAge(value);
    }
  };
  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "http://localhost:5035/upload",
  });

  const handleChangeUpload = (event) => {
    setSelectedImage(event.target.files[0]);
    setImageChange(true);
  };
  const handleSubmit = async () => {
    if (imageChange) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      uploadImage(formData).then((uploadedImage) => {
        console.log(uploadedImage);
        setIsSucceed(uploadedImage.filename);
        axios
          .put(
            "http://localhost:5035/courses/" + item._id,
            {
              Name: name,
              Description: description,
              Price: price,
              enteringQuantity,
              Sex: sex,
              enteringQuantity,
              Image: uploadedImage.filename,
              age: age,
              colors: selectedColors,
              size: selectedSizes,
              materials,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    } else {
      axios
        .put(
          "http://localhost:5035/courses/" + item._id,
          {
            Name: name,
            Description: description,
            Price: price,
            enteringQuantity,
            Sex: sex,
            enteringQuantity,
            age: age,
            colors: selectedColors,
            size: selectedSizes,
            materials,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleSelectColor = (color) => () => {
    const clickedCategory = selectedColors.indexOf(color);
    const all = [...selectedColors];
    if (clickedCategory === -1) {
      all.push(color);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setSelectedColors(all);
  };
  const handleSelectMaterial = (material) => () => {
    const clickedCategory = selectedMaterials.indexOf(material);
    const all = [...selectedMaterials];
    if (clickedCategory === -1) {
      all.push(material);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setSelectedMaterials(all);
  };
  const handleSelectSize = (size) => () => {
    const clickedCategory = selectedSizes.indexOf(size);
    const all = [...selectedSizes];
    if (clickedCategory === -1) {
      all.push(size);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setSelectedSizes(all);
  };
  return (
    <div className="container-md">
      <Link href={"/course"}>
        <Button>
          {" "}
          <FontAwesomeIcon icon={faHome} />{" "}
        </Button>
      </Link>
      <h2>Chi ti???t s???n ph???m</h2>
      <form method="PUT" onSubmit={handleSubmit}>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>???nh s???n ph???m</p>
        <Image
          src={"http://localhost:5035/upload/images/" + selectedImage}
          width="200px"
          height="200px"
        />
        <input
          onChange={handleChangeUpload}
          accept=".jpg, .png, .jpeg"
          className="fileInput mb-2"
          type="file"
        ></input>
        <div className="form-group mb-2">
          <label htmlFor="name">T??n s???n ph???m</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nh???p t??n s???n ph???m"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">M?? t???</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="description"
            value={description}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Gi??</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Gi?? s???n ph???m"
            required
            name="price"
            value={price}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="Curentcolors">M??u hi???n t???i</label>
          <input
            type="text"
            className="form-control"
            id="Curentcolors"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="Curentcolors"
            value={selectedColors}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentSizes">K??ch c??? hi???n t???i</label>
          <input
            type="text"
            className="form-control"
            id="CurrentSizes"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="CurrentSizes"
            value={selectedSizes}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Ch???t li???u hi???n t???i</label>
          <input
            type="text"
            className="form-control"
            id="CurrentMaterials"
            placeholder="Nh???p m?? t??? s???n ph???m"
            required
            name="CurrentMaterials"
            value={selectedMaterials}
            disabled
          />
        </div>
        <div style={{ display: "flex" }}>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <label htmlFor="sex">M??u</label>
            {colors.map((color) => (
              <div>
                <input type="checkbox" onChange={handleSelectColor(color)} />
                <label style={{ marginLeft: "8px" }}>{color}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="size">K??ch c???</label>
            {sizes.map((size) => (
              <div>
                <input type="checkbox" onChange={handleSelectSize(size)} />
                <label style={{ marginLeft: "8px" }}>{size}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Ch???t li???u</label>
            {materials.map((material) => (
              <div>
                <input
                  type="checkbox"
                  onChange={handleSelectMaterial(material)}
                />
                <label style={{ marginLeft: "8px" }}>{material}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age">????? tu???i</label>
          <select
            className="form-control"
            id="age"
            required
            name="age"
            value={age}
            onChange={handleChange()}
          >
            <option>Adult</option>
            <option>Kid</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="enteringQuantity">S??? l?????ng nh???p kho</label>
          <input
            type="number"
            className="form-control"
            id="enteringQuantity"
            placeholder="S??? l?????ng nh???p kho"
            required
            name="enteringQuantity"
            value={enteringQuantity}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="soldQuantity">S??? l?????ng ???? b??n</label>
          <input
            type="number"
            className="form-control"
            id="soldQuantity"
            placeholder="S??? l?????ng nh???p kho"
            required
            name="soldQuantity"
            value={soldQuantity}
            onChange={handleChange()}
          />
        </div>
        <hr />
        <button type="submit" className="btn btn-primary">
          C???p nh???t s???n ph???m
        </button>
      </form>
    </div>
  );
}
export default Form;
