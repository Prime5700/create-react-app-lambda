import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
   
 const AddWishlistPopover=({buttonName , sucessMessage})=> {
    return (
      <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      >
        <PopoverHandler >
          <button>
            {buttonName}
            </button>
        </PopoverHandler>
        <PopoverContent>
          {sucessMessage}
        </PopoverContent>
      </Popover>
    );
  }
  export default AddWishlistPopover;