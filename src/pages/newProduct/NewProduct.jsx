import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="product title" />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            // onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            // onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Categories" 
          // onChange={handleCat} 
          />
        </div>
        <div className="addProductItem">
          <label>Sub-Categories</label>
          <input type="text" placeholder="Sub-Categories" 
          // onChange={handleCat} 
          />
        </div>
        <div className="addProductItem">
          <label>In Stock?</label>
          <select name="inStock" >
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
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
