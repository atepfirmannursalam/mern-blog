import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-600">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-cyan-600 via-purple-700 to bg-pink-700 rounded-md text-white">Firman</span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferer">
                  My Portfolio
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferer">
                  Firman Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow US" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://instagram.com/atpfrmnnrslm" target="_blank" rel="noopener noreferer">
                  Instagram
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferer">
                  Youtube
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="text-slate-900 dark:text-slate-300 text-sm text-center font-base">
          created with <span className="text-pink-600">❤</span> by Atep Firman Nursalam using MERN stack + Tailwind CSS <Footer.Copyright href="#" by="Firman's blog" year={new Date().getFullYear()} />
        </div>
      </div>
    </Footer>
  );
}
