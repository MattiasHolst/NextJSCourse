import { ReactNode } from 'react';

interface NewsDetailLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const NewsDetailLayout: React.FC<NewsDetailLayoutProps> = ({ children, modal }) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default NewsDetailLayout;