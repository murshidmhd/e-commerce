import axios from "axios";
import { useState } from "react";

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [users, setUsers] = useState([]);
const [listings, setListing] = useState([]);

function DashBoard() {
  const fetcing = async () => {
    try {
      let usersData = await axios.get("http://localhost:3000/users");
      let listings = await axios.get("http://localhost:3000/listings");
      setUsers(usersData);
      setListing(listings);

      let totalRevenue = usersData
        .flatMap((u) => {
          u.orders || [];
        })
        .reduce((sum, order) => {
          sum += order.price * order.quantity;
        });
      console.log();
    } catch (err) {
      console.error(err);
    }
  };
  return <></>;
}

export default DashBoard;
