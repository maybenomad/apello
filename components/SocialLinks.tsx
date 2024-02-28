import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div
      className="fixed right-0.5 bottom-4 z-30 flex flex-col gap-y-2 text-[#c4c4c4] "
      aria-label="social media section"
    >
      <a
        href="https://github.com/Apello-xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-1 lg:px-3 "
      >
        <FaGithub
          size={20}
          className="cursor-pointer hover:scale-110 hover:text-white "
        />
      </a>
      <a
        href="https://twitter.com/apelloxyz"
        target="_blank"
        rel="noopener noreferrer"
        className="px-1 lg:px-3 "
      >
        <FaTwitter
          size={20}
          className="cursor-pointer hover:scale-110 hover:text-white"
        />
      </a>
      <a
        href="https://discord.gg/caalabs"
        target="_blank"
        rel="noopener noreferrer"
        className="px-1 lg:px-3"
      >
        <FaDiscord
          size={20}
          className="cursor-pointer hover:scale-110 hover:text-white"
        />
      </a>
    </div>
  );
}
