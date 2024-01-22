import './Stars.css'
function Stars(props){
        let stars = [];
        let newstars = []
        for(let i=0;i<props.rating;i++){
            stars.push(<span className='filled'>&#9733;</span>)
            newstars.push(stars[i].props.children)
        } 
        console.log(newstars.join(''))
    return(
        <>
            {newstars}
        </>
    )
}
export default Stars;