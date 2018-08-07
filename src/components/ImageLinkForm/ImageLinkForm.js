import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm=({onInputChange, onButtonSubmit})=>{
	return(
		<div>
			<p className='f3'>{'This Magic Brain Will Detect Your Faces. Give It A Try!'}</p>
			<div className='center'>
				<div className=' form center pa4 br2 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' placeholder='Enter Url' onChange={onInputChange}/>
					<button onClick={onButtonSubmit} className='w-30 link dib white bg-light-purple ph3 pv2 f4 grow'>Detect</button>
				</div>
			</div>
		</div>
	);
}
export default ImageLinkForm; 