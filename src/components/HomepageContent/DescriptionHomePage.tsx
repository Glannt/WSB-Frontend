export const DescriptionHomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-36 ">
      {/* Column for Image */}
      <div className="image-column">
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2620&q=80"
          alt="Example"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Column for Text */}
      <div className="text-column flex items-center justify-center">
        <div className="text-content">
          <h1 className="text-4xl font-bold mb-4">Tiện ích</h1>
          <p className="text-lg">
            This is an example of a paragraph that will be displayed in the
            second column next to the image. You can adjust the text content
            here.
          </p>
        </div>
      </div>
    </div>
  );
};
