import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [vehicle, setVehicle] = useState([]);
  const [vehicleModel, setvehicleModel] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  // const [subcat, setsubCat] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    // setCat(e.target.value.split(",")); use this if categories is an arrat
    setCat(e.target.value);
  };
  const handleVehicle = (e) => {
    setVehicle(e.target.value.split(","));
  };
  const handleVehicleModel = (e) => {
    setvehicleModel(e.target.value.split(","));
  };
  const handleManufacturer = (e) => {
    setManufacturer(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
        // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("upload unsuccessful");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, category: cat, manufacturer: manufacturer, vehicle: vehicle, vehiclemodel: vehicleModel, seller: user._id.toString() };

          addProduct(product, dispatch);
        });
      }
    );
  };



  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="product title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="e.g. 100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="category" type="text" placeholder="e.g. Interior"
            onChange={handleCat}
          />
        </div>
        <div className="addProductItem">
          <label>Manufacturer</label>
          <input name="manufacturer" type="text" placeholder="e.g. Yokohama"
            onChange={handleManufacturer}
          />
        </div>
        <div className="addProductItem">
          <label>Vehicle</label>
          <input name="vehicle" type="text" placeholder="e.g. Honda Civic"
            onChange={handleVehicle}
          />
        </div>
        <div className="addProductItem">
          <label>Vehicle Model</label>
          <input name="vehiclemodel" type="text" placeholder="e.g. 2020"
            onChange={handleVehicleModel}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Sub-Categories</label>
          <input type="text" placeholder="Sub-Categories" 
          // onChange={handleCat} 
          />
        </div> */}
        <div className="addProductItem">
          <label>In Stock?</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {/* <input type="text" placeholder="123" /> */}
        </div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
