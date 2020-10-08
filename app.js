var animeList = document.getElementById("anime-list");
var animeForm = document.getElementById("add-anime-form");

function renderAnime(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let type = document.createElement('span')
    let cross = document.createElement('div');
    li.setAttribute('data-id',doc.id);

    name.textContent = doc.data().name;
    type.textContent = doc.data().type;
    cross.textContent= '⨉';
    li.appendChild(name);
    li.appendChild(type);
    li.appendChild(cross);
    animeList.appendChild(li);

    cross.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Animes').doc(id).delete();
    });
}
// db.collection('Animes').orderBy('type').get().then((snapshots)=>{
//     snapshots.docs.forEach(doc => {
//         renderAnime(doc);
//     });
// });

animeForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(animeForm.name.value!='' && animeForm.type.value!=''){
    db.collection('Animes').add({
        name: animeForm.name.value,
        type: animeForm.type.value
    });
}
    animeForm.name.value='';
    animeForm.type.value='';
    
});

db.collection('Animes').orderBy('type').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=> {
        if(change.type=='added'){
            renderAnime(change.doc);
        }  
        else if(change.type=='removed'){
            let li = document.querySelector('[data-id='+ change.doc.id+ ']');
            animeList.removeChild(li);
        }
    });
    

});