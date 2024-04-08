const search = () =>{
    const searchbox = document.getElementById("find").value.toUpperCase();
    const storeitems = document.getElementById("container")
    const column = document.querySelectorAll(".column")
    const pname = storeitems.getElementsByTagName ("h2")
    
    for(var i=0; i < pname.length; i++){
        let match = column[i].getElementsByTagName('h2')[0];

        if(match){
          let textvalue = match.textContent || match.innerHTML

            if(textvalue. toUpperCase().indexOf(searchbox) > -1){
                column[i].style.display = "";
            } else{
                column[i].style.display = "none";

            }     
        }
    }
}