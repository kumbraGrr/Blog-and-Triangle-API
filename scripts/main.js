const formPost = document.getElementById('formPost');
const formComment = document.getElementById('commentPost');
const form = document.getElementById('postChange');
const form2 = document.getElementById('commentChange');

removehidden(); //Remove hidden input from previous session (if it is there)

//Create form for new post
function createForm(){
    cancel()
    let textareaTitle = document.getElementById('textarea1');
    let textareaBody = document.getElementById('textarea2');
    textareaTitle.value = ""; // In case of a change from edit post to a new post values are reseted
    textareaBody.value = "";
    formComment.style.display = "none";
    formPost.style.display = "block"; //Show form
    form.action = '/api/createPost/';
}


//Create form for post edit
async function editPost(val){
    cancel();
    formComment.style.display = "none";
    formPost.style.display = "block"; //Show form
    await setValues(val, 'post'); //Telling a form that chenges applies for a form
    let hiddenInput = await createHiddenInp(val);
    form.appendChild(hiddenInput);
    form.action = '/api/editPost/';
};

//Insert values from the post to the edit input
function setValues(val, typeOfARequest){
    if(typeOfARequest === 'post'){
        let title = document.getElementById(val).getElementsByTagName('h4');
        let body = document.getElementById(val).querySelectorAll("#postBody");
        let textareaTitle = document.getElementById('textarea1');
        let textareaBody = document.getElementById('textarea2');
        textareaTitle.value = title[0].innerText.slice(0,-34);
        textareaBody.value = body[0].innerText;
    }else if(typeOfARequest === 'comment'){
        let body = document.getElementById(val).innerText;
        let textAreaBody = document.getElementById('textArea3');
        textAreaBody.value = body;
    }
    
};

//Create input for id of the post
function createHiddenInp(value) {
    let hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'id';
    hiddenInput.value = value;
    hiddenInput.id = 'editChanges';
    return hiddenInput;
};

function addComment(val){
    cancel();
    let textareaBody = document.getElementById('textArea3');
    textareaBody.value = "";
    formPost.style.display = "none";
    formComment.style.display = "block";
    let hiddenInput = createHiddenInp(val);
    form2.appendChild(hiddenInput);
    form2.action = '/api/createComment/';
};

function editComment(val){
    cancel();
    formPost.style.display = "none";
    formComment.style.display = "block";
    let hiddenInput = createHiddenInp(val.slice(7));
    setValues('body' + val, 'comment');
    form2.appendChild(hiddenInput);
    form2.action = '/api/editComment/';
};

//Remove hidden input
function removehidden(){
    let hidden = document.getElementById('editChanges');
    if(hidden !== null && hidden.parentNode == form){
        form.removeChild(hidden);
    }else if(hidden !== null && hidden.parentNode == form2){
        form2.removeChild(hidden);
    }
};

//Function called when button cencel clicked
function cancel(){
    removehidden();
    formPost.style.display = "none";
    formComment.style.display = "none";
};
