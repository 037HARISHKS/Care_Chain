import { Footer as FlowbiteFooter } from 'flowbite-react';

const Footer = () => {
  return (
    <FlowbiteFooter container className="border-t">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FlowbiteFooter.Brand
            href="/"
            className="mb-4 sm:mb-0"
          >
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Healthcare System
            </span>
          </FlowbiteFooter.Brand>
          <FlowbiteFooter.LinkGroup>
            <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Privacy Policy</FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Terms</FlowbiteFooter.Link>
            <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
          </FlowbiteFooter.LinkGroup>
        </div>
        <FlowbiteFooter.Divider />
        <FlowbiteFooter.Copyright
          by="Healthcare System™"
          href="#"
          year={2024}
        />
      </div>
    </FlowbiteFooter>
  );
};

export default Footer; 