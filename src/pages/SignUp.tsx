import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Google, Person } from "@mui/icons-material";
import { useContext, useState } from "react";
import { auth, googleProvider, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } = useContext(AuthContext);

  const signUpWithEmailAndPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res?.user.uid), {
        firstName,
        lastName,
        favourites: [],
        email: res?.user.email,
        uid: res?.user.uid,
      });

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await signInWithPopup(auth, googleProvider);

      const firstName: string | undefined = res.user.displayName
        ?.split(" ")
        .at(0)
        ?.trim();
      const lastName: string | undefined = res.user.displayName
        ?.split(" ")
        .at(-1)
        ?.trim();

      await setDoc(doc(db, "users", res?.user.uid), {
        firstName,
        lastName,
        favourites: [],
        email: res?.user.email,
        uid: res?.user.uid,
      });

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInAsGuest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await signInAnonymously(auth);

      const firstName: string | undefined = "Guest";
      const lastName: string | undefined = "";

      await setDoc(doc(db, "users", res?.user.uid), {
        firstName,
        lastName,
        favourites: [],
        email: res?.user.email,
        uid: res?.user.uid,
      });

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout activePage='sign-in' showFooter={false} showHeader={true}>
      <section className='max-w-[48rem] p-3 my-auto mx-auto'>
        <h1 className='my-3 font-bold text-4xl text-rose text-center uppercase'>
          Sign Up
        </h1>
        <p className='mb-4 px-3 text-base text-center'>
          Create an account to keep track of your favourite Movies, TV Shows and
          Celebrities
        </p>
        <form
          onSubmit={signUpWithEmailAndPassword}
          className='grid justify-stretch gap-4 grid-cols-2'
        >
          <div className='grid gap-1 text-base'>
            <label htmlFor='first-name' className='font-semibold text-rose'>
              First Name
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='first-name'
              name='first-name'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value.trim())}
              placeholder='Enter your first name'
              className='w-full p-3 border border-gray-300'
              required
            />
          </div>

          <div className='grid gap-1 text-base'>
            <label htmlFor='last-name' className='font-semibold text-rose'>
              Last Name
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='last-name'
              name='last-name'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value.trim())}
              placeholder='Enter your last name'
              className='w-full p-3 border border-gray-300'
              required
            />
          </div>

          <div className='col-span-full grid gap-1 text-base'>
            <label htmlFor='email' className='font-semibold text-rose'>
              Email
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder='Enter your email address'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <div className='col-span-full grid gap-1 text-base'>
            <label htmlFor='password' className='font-semibold text-rose'>
              Password
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Enter your password'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <button
            className={`col-span-full w-full mt-2 p-3 flex justify-center items-center bg-rose font-semibold text-base text-white uppercase active:scale-90 transition-transform ease-in-out duration-300`}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color='white' /> : "Sign up"}
          </button>
        </form>

        <div className='flex justify-between mt-2 font-semibold text-[1.2rem]'>
          <p>
            Already have an account?{" "}
            <Link to='/sign-in' className='text-rose underline'>
              Sign in.
            </Link>
          </p>
        </div>

        <div className='mt-6 h-[0.15rem] w-full bg-gray-300'></div>

        <button
          className='mt-6 flex justify-center gap-2 w-full border border-gray-400 p-3 text-center text-base active:scale-90 transition-transform ease-in-out duration-300'
          onClick={signInWithGoogle}
        >
          {isLoading ? (
            <ClipLoader color='black' />
          ) : (
            <>
              <Google fontSize='large' />
              Continue with Google
            </>
          )}
        </button>

        <button
          className='mt-3 flex justify-center items-center gap-2 w-full border border-gray-400 p-3 text-center text-base active:scale-90 transition-transform ease-in-out duration-300'
          onClick={signInAsGuest}
        >
          {isLoading ? (
            <ClipLoader color='black' />
          ) : (
            <>
              <Person fontSize='large' /> Continue as Guest
            </>
          )}
        </button>
      </section>
    </MainLayout>
  );
};

export default SignUp;
