import { BookingTable } from "../bookingTable/BookingTable";
import LoadingCircle from "../loadingCircle/LoadingCircle";
import { useAuthContext } from "../../context/UseAuthContext";
import { Login } from "../login/Login";

export default function MainView() {
  const { data: user, isLoading } = useAuthContext();

  const isLoggedIn = !isLoading && !user?.userId;
  
  return (
    <>
      {isLoading && <LoadingCircle />}
      {isLoggedIn && <Login />}
      {!isLoggedIn && <BookingTable />}
    </>
  );
}
