async function getTodo(id) {
  // Always cache the data
  const response = await fetch(`http://localhost:3000/api/users/${id}`, {
    next: { revalidate: 10 }, // User request 到來的 10 秒後重新 build 一次這個頁面，並且在這 10 秒內的所有 request 都會用 cache 的資料，直到超過 10 秒後才會用新的資料
  });

  if (!response.ok) throw Error;

  const data = await response.json();

  return data;
}

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const users = await fetch("http://localhost:3000/api/users").then((res) =>
    res.json()
  );

  const ids = users.map((item) => ({
    id: item.id.toString(),
  }));

  return ids;
}

export default async function ISR_USER_Page({ params }) {
  const data = await getTodo(params.id);

  return (
    <div>
      <h1>Incremental Static Regeneration + Dynamic Route Page</h1>
      <p>
        ISR 可以想成是 SSG + Revalidate 的實踐結果，若使用者在 url 輸入的 route
        是已經預先透過 generateStaticParams build 好的就會直接回傳 html
        檔，若是沒 build 過的路徑，就會 build 好以後回傳。
      </p>
      <p>{data.id}</p>
      <p>fetched data: {data.name}</p>
    </div>
  );
}
