import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useMutate } from "restful-react";

function Form() {
  const editorRef = useRef();
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState(0);
  const [enteringQuantity, setEnteringQuantity] = useState(0);
  const [colors, setColors] = useState([
    "yellow",
    "blue",
    "red",
    "pink",
    "violet",
    "purple",
    "green",
    "gray",
    "gold",
    "orange",
    "brown",
  ]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [materials, setMaterials] = useState(["Cotton", "Thun", "Nilon"]);
  const [shirtTypes, setShirtTypes] = useState([
    "Áo sơ mi",
    "Áo thun",
    "Áo khoác",
    "Áo len",
    "Suit",
  ]);
  const [shortsTypes, setShortsTypes] = useState([
    "Quần jean",
    "Quần kaki",
    "Quần thể thao",
    "Đầm",
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [isSucceed, setIsSucceed] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [data, setData] = useState("");
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "http://localhost:5035/upload",
  });

  const handleChangeUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);

    uploadImage(formData)
      .then((uploadedImage) => {
        console.log(uploadedImage);
        setIsSucceed(uploadedImage.filename);
      })
      .catch((_) => {
        console.log("Oooops, something went wrong!");
      });
  };

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
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

  const handleSubmit = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      uploadImage(formData)
        .then((uploadedImage) => {
          console.log(uploadedImage);
          setIsSucceed(uploadedImage.filename);
          axios
            .post(
              "http://localhost:5035/courses",
              {
                name,
                description,
                sex,
                price,
                enteringQuantity,
                image: uploadedImage.filename,
                age: age,
                colors: selectedColors,
                size: selectedSizes,
                materials,
                type: selectType,
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
        })
        .catch((_) => {
          console.log("Oooops, something went wrong!");
        });
    } else {
      axios
        .post(
          "http://localhost:5035/courses",
          {
            name,
            description,
            sex,
            price,
            price,
            enteringQuantity,
            age,
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

  const handleSelectType = (type) => () => {
    setSelectType(type);
  };
  return (
    <div className="container-md">
      <h2>Thêm sản phẩm</h2>
      <form method="POST" onSubmit={handleSubmit} action="/course">
        <div className="form-group mb-2">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên sản phẩm"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Mô tả</label>
          {editorLoaded ? (
            <CKEditor
              className="form-control"
              editor={ClassicEditor}
              config={{
                placeholder: "Hãy viết gì đó ...",
                language: "vi",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={data}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          ) : (
            <p>Carregando...</p>
          )}
          {/*  <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="description"
            value={description}
            onChange={handleChange()}
          /> */}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Giá</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Giá sản phẩm"
            required
            name="price"
            value={price}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="enteringQuantity">Số lượng nhập kho</label>
          <input
            type="number"
            className="form-control"
            id="enteringQuantity"
            placeholder="Số lượng nhập kho"
            required
            name="enteringQuantity"
            value={enteringQuantity}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Giới tính</label>
          <select
            className="form-control"
            id="sex"
            required
            name="sex"
            value={sex}
            onChange={handleChange()}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div style={{ display: "flex" }}>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <label htmlFor="sex">Màu</label>
            {colors.map((color, index) => (
              <div key={index}>
                <input type="checkbox" onChange={handleSelectColor(color)} />
                <label style={{ marginLeft: "8px" }}>{color}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="size">Kích cỡ</label>
            {sizes.map((size, index) => (
              <div key={index}>
                <input type="checkbox" onChange={handleSelectSize(size)} />
                <label style={{ marginLeft: "8px" }}>{size}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Chất liệu</label>
            {materials.map((material, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={handleSelectMaterial(material)}
                />
                <label style={{ marginLeft: "8px" }}>{material}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Áo</label>
            {shirtTypes.map((shirt, index) => (
              <div key={index}>
                <input
                  name="type"
                  type="radio"
                  onClick={handleSelectType(shirt)}
                />
                <label style={{ marginLeft: "8px" }}>{shirt}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Quần</label>
            {shortsTypes.map((short, index) => (
              <div key={index}>
                <input
                  name="type"
                  type="radio"
                  onClick={handleSelectType(short)}
                />
                <label style={{ marginLeft: "8px" }}>{short}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age">Độ tuổi</label>
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
        <p style={{ margin: "8px 0", fontSize: "16px" }}>Tải ảnh sản phẩm</p>
        <input
          onChange={handleChangeUpload}
          accept=".jpg, .png, .jpeg"
          className="fileInput mb-2"
          type="file"
        ></input>
        <hr />
        <button type="submit" className="btn btn-primary">
          Tạo sản phẩm
        </button>
      </form>
    </div>
  );
}
export default Form;
