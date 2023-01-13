import PrimaryButton from "../../../components/buttons/PrimaryButton";
import LoginInput from "../../../components/LoginInput";
import Link from "next/link";
import LoginWrapper from "../../../components/LoginWrapper";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../../graphql/mutation_vars";
import { useRouter } from "next/router";

const Login = () => {
  const loading = false;

  const [login, { data }] = useMutation(USER_LOGIN);

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      await login({
        variables: {
          email: formData.get("email"),
          password: formData.get("password"),
        },
      });
      router.push("/dashboard");
    } catch (error) {
      // console.log(error)
    }
  };

  return (
    <LoginWrapper>
      <form className="relative" onSubmit={handleLogin}>
        {/* {loading && <LoadingSpinner />} */}

        <div className={loading ? "hidden" : ""}>
          {/* <img
                    className="lg:mx-0 mx-auto dark:brightness-[2.5] "
                    src={logo}
                    alt="Easy Dash Logo"
                  /> */}
          <LoginInput
            defaultValue="test@test.com"
            id="email"
            name="email"
            type="email"
            required
          >
            Email Address
          </LoginInput>
          <LoginInput
            id="password"
            name="password"
            type="password"
            defaultValue="asdf1234"
            required
          >
            Password
          </LoginInput>
          <div className="flex justify-between -mt-1 text-blue-500 only-of-type:a">
            <div>
              <span className="dark:text-gray-500 text-gray-600">
                {" "}
                No Account?{" "}
              </span>
              <Link href="/dashboard/register" className="underline">
                Create One!
              </Link>
            </div>
            <a href="/dashboard" className="underline">
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-end my-6">
            <PrimaryButton padding="px-10 py-1.5">LOGIN</PrimaryButton>
          </div>
        </div>
      </form>

      {/* <Route path="/dashboard/register">
              <RegisterForm />
            </Route> */}
    </LoginWrapper>
  );
};
export default Login;
