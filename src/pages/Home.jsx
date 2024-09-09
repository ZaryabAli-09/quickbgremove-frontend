function Home() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="p-3 border">
        <input type="file" className="text-black" accept="image/*" />
        <button className="p-2 bg-black rounded-md text-white hover:bg-gray-900">
          Upload
        </button>
      </div>
    </div>
  );
}
export default Home;
