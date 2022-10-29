import '../../assets/styles/css/particles/preloader.css'

function Preloader({ height = '30px', width = '100%', radius = '4px'  }) {
  return <div 
    style={{
      minHeight: height, 
      width : width, 
      borderRadius: radius
    }}
    className="preview-block">
  </div>
}

export default Preloader
