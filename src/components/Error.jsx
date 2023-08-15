import PropTypes from "prop-types";

const Error = ({mensaje}) => {
  return (
    <div className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md'>
        <p>{mensaje}</p>
    </div> 
  )
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired,
}

export default Error
