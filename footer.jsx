import React from "react";

const date = new Date();
const year = date.getFullYear();
var message = "Copyright " + year;
function Footer() {
  return (
    <footer>
      <p>&copy; {message}</p>
    </footer>
  );
}

export default Footer;
