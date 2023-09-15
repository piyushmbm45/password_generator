import { Gen } from './Gen';
import { Quote } from './Quote';

export default function App() {
  return (
    <>
      <div className="flex h-screen text-center justify-between flex-col">
        <div className="">
          <h1 className="text-white text-xl text-center">Password Generator</h1>
          <Gen />
        </div>
        <Quote />
        <div className=" ">
          <Footer />
        </div>
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <footer className="">
      <span className=" text-white">No Copy right &#128525;</span>
    </footer>
  );
};
