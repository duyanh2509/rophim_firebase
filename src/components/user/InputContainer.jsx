function InputContainer() {
  return (
    <header className="fixed top-0 left-0 z-10 flex flex-wrap gap-1 items-center justify-center bg-[#0F111A] w-full p-4">
      <div className="w-[120px] shrink-0">
        <img
          className="w-full"
          src="https://res.cloudinary.com/dehyvlweg/image/upload/v1752458789/ro-phim-logo_e3foeo.svg"
          alt="Rổ Phim"
        />
      </div>
      <div className="flex-1 relative max-w-[368px] h-[44.8px]">
        <input
          className="w-full h-full bg-white/10 border-0 rounded-[5px] text-amber-50 px-3"
          type="text"
          placeholder="Tìm kiếm phim, diễn viên"
        />
      </div>
      <nav
        style={{ flex: '2 1 400px' }}
        className="flex flex-wrap justify-center gap-2 "
      >
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Chủ Đề
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Thể Loại
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Phim Lẻ
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Xem Chung
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Quốc Gia
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Diễn Viên
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Lịch Chiếu
        </a>
        <a
          className="no-underline text-amber-50 text-[13px] px-2 py-0 whitespace-nowrap transition-colors duration-300 ease-in-out hover:text-[#FFD875]"
          href="#"
        >
          Chủ Đề
        </a>
      </nav>
      <div className="flex px-5 py-0">
        <div className="flex flex-col border-r border-r-white px-5 py-0">
          <a className="text-[14px] font-sans text-white" href="#">
            Tải Ứng Dụng
          </a>
          <a className="text-[14px] font-sans text-white" href="#">
            RoPhim
          </a>
        </div>
        <div className="flex items-center border rounded-[13px] w-[125px] h-[40.58px] justify-center bg-amber-50 ml-4">
          <a className="text-[14px] font-sans font-bold text-[#333]" href="#">
            Thành viên
          </a>
        </div>
      </div>
      {/* <div>🔍</div> */}
    </header>
  );
}

export default InputContainer;
