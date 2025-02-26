import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 px-2 pt-2 pb-6">
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {children}
      </div>
    </main>
  );
}

export default Layout; 