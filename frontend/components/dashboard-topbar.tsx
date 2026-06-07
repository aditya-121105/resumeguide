'use client';

import {
  User,
  ChevronDown,
} from 'lucide-react';
import {
  Button,
} from '@/components/ui/button';

import {
  useEffect,
  useState,
} from 'react';
import api from '@/lib/api';


export function DashboardTopBar() {
  const [user,
  setUser] =
  useState<any>(null);

const [open,
  setOpen] =
  useState(false);
   const handleLogout = () => {

    localStorage.removeItem(
      'access_token'
    );

    window.location.href =
      '/';
  };
    useEffect(() => {

  const fetchUser =
    async () => {

      try {



        const response =
  await api.get(
    '/auth/me'
  );

setUser(
  response.data
);

      } catch (error: any) {

  console.error(
    error.response?.data ||
    error.message
  );
}
    };

  fetchUser();

}, []);



  return (

    <header className="border-b border-border bg-card">

      <div className="flex items-center justify-end px-6 py-4">

        <div className="relative flex items-center gap-3">
<Button
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>

  <button
    onClick={() =>
      setOpen(
        !open
      )
    }
    className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      px-3
      py-2
      transition
      hover:bg-muted
    "
  >

    <div
      className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        bg-primary/15
      "
    >
      <User
        className="
          h-4
          w-4
          text-primary
        "
      />
    </div>

    <ChevronDown
      className="
        h-4
        w-4
      "
    />

  </button>

  {open && (

    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-72
        rounded-2xl
        border
        bg-card
        p-4
        shadow-lg
      "
    >

      <div
        className="
          border-b
          pb-3
        "
      >

        <p
          className="
            font-semibold
          "
        >
          {user?.full_name}
        </p>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >
          {user?.email}
        </p>

      </div>

      <div
        className="
          mt-3
          space-y-2
        "
      >


      </div>

    </div>

  )}

</div>

      </div>

    </header>
  );
}