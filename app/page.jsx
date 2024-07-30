import { prisma } from "@/app/lib/prisma";
import Header from "@/components/Header";

export default async function Home() {
  let users = await prisma.user.findMany();

  const data = await getUsers();

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <Header />
      {data[1].name}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}

async function getUsers() {
  // Always cache the data
  const response = await fetch("http://localhost:3000/api/users", {
    cache: "no-store", // SSG，如果要用 SSR 則是設定 cache: 'no-store'
  });

  if (!response.ok) throw Error;

  const data = await response.json();

  return data;
}
