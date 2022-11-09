import "../news/heroimage.css";

import pic from "../../Images/city1.png";
export default function HeaderHero() {
  return (
  <div class="hero-setting">
    {/* <img id="hero-imageid"src={pic} alt="picture" /> */}
   
  <div class="hero-text">
    <h1 style={{fontsize:'50px'}} >I am John Doe</h1>
    <p>And I'm a Photographer</p>
    <button>Hire me</button>
  </div>
   
  </div>
  );
}


