import { BookingTable } from "../bookingTable/BookingTable";
import LoadingCircle from "../loadingCircle/LoadingCircle";
import { useAuthContext } from "../../context/UseAuthContext";
import { Login } from "../login/Login";
import { Suspense } from "react";

export default function MainView() {
  const { user, isLoading: authLoading } = useAuthContext();

  if (authLoading) return <LoadingCircle />;

  return (
    <>
      <>
        {!user?.userId ? (
          <Login />
        ) : (
          <Suspense fallback={<Loading />}>
            <BookingTable />
          </Suspense>
        )}
      </>
    </>
  );
}

function Loading() {
  return (
    <>
      <h1>🌀 Loading...</h1>
    </>
  );
}
