import { useState } from "react";
import Link from "next/link";
import { validatePassword } from "../../../client/src/utils/validatePassword";
import LoadingSpinner from "../../../client/src/components/LoadingSpinner";
import LoginInput from "../../../client/src/components/LoginInput";
import PrimaryButton from "../../../client/src/components/buttons/PrimaryButton";
import LoginWrapper from "../../../components/LoginWrapper";

const Register = () => {
  const [error, setError] = useState<string[]>([]);

  //   const [createUser, { data, loading }] = useMutation(CREATE_USER)
  const createUser = null;
  const data = null;
  const loading = false;

  return (
    <LoginWrapper>
      <form
        className="relative"
        onSubmit={async (e: any) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          const email = formData.get("email");

          const password = formData.get("password")?.toString();
          const password2 = formData.get("password2")?.toString();

          password &&
            password2 &&
            validatePassword(password, password2, setError);

          try {
            await createUser({
              variables: {
                email: email,
                password: password,
              },
            });
          } catch (error) {}
        }}
      >
        {loading && <LoadingSpinner />}
        {/* <img className="lg:mx-0 mx-auto" src={logo} alt="Easy Dash Logo" /> */}

        {!data ? (
          <>
            <h1 className="text-3xl text-gray-800 h-14">Create Account</h1>
            <LoginInput id="email" name="email" type="email" required>
              Email Address
            </LoginInput>
            <LoginInput
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
            >
              Password
            </LoginInput>
            <LoginInput
              id="password2"
              name="password2"
              type="password"
              required
              minLength={8}
            >
              Re-enter Password
            </LoginInput>

            <div className="flex justify-between -mt-1 text-gray-600">
              <div>
                <span>Already have an account? </span>
                <Link
                  href="/dashboard/login"
                  className="text-blue-700 underline"
                >
                  Login
                </Link>
              </div>
            </div>

            <div className="flex justify-end my-6">
              <PrimaryButton type="submit">CREATE ACCOUNT</PrimaryButton>
            </div>
            <div className="absolute bottom-0 list-none">
              {error.length > 0 && "Invalid Password"}
              {error.map((i, idx) => {
                return <li key={idx}>{i}</li>;
              })}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-gray-800 h-14">
              Account successfully created.
            </h1>
            <div className="flex justify-between -mt-1 text-gray-600">
              <div>
                <span>You may now </span>
                <Link href="/dashboard/" className="text-blue-700 underline">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}
      </form>
    </LoginWrapper>
  );
};

export default Register;
