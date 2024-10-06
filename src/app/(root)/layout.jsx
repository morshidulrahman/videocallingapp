import StreamVideoProvider from "@/providers/StreamProvider";

const RootLayout = ({ children }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
