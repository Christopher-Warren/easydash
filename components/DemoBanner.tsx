import Link from "next/link";
import { useRouter } from "next/router";

const DemoBanner = () => {
  const router = useRouter();

  let message = "";

  if (router.pathname.includes("dashboard")) {
    message = "storefront";
  } else {
    message = "admin dashboard";
  }
  return (
    <div className="bg-purple-600 fixed z-20 top-0 w-screen h-10 flex items-center justify-center text-neutral-50">
      <p>
        This is a demo for EasyDash.{" "}
        <Link
          className="underline underline-offset-2"
          href={message == "storefront" ? "/" : "/dashboard"}
        >
          Click here
        </Link>{" "}
        to see the {message}.
      </p>
    </div>
  );
};
export default DemoBanner;
