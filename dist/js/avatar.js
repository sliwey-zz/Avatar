function pixelate(t){var e=new Image;e.src=window.URL.createObjectURL(t),e.onload=function(){ctx.drawImage(e,0,0,200,200);var a,n,i,r,c,d,s,l,v=ctx.getImageData(0,0,canvas.width,canvas.height),g=v.data,o=20,f=20,u=v.width/f,h=v.height/o;for(ctx.clearRect(0,0,canvas.width,canvas.height),a=0;o>a;a++)for(n=0;f>n;n++)i=~~(u*n+u/2),r=~~(h*a+h/2),c=4*i+~~(r*v.width*4),d=g[c],s=g[c+1],l=g[c+2],ctx.fillStyle="rgb("+d+","+s+","+l+")",ctx.fillRect(u*n,h*a,u,h);target.style.visibility="hidden",canvas.style.visibility="visible",window.URL.revokeObjectURL(t)}}var target=document.getElementById("target"),input=document.getElementById("file"),canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d");target.addEventListener("click",function(){input.click()},!1),target.addEventListener("dragenter",function(t){var e=t.dataTransfer.types;e=Array.prototype.slice.call(e),-1!==e.indexOf("Files")&&this.classList.add("active")},!1),target.addEventListener("dragover",function(t){t.preventDefault()},!1),target.addEventListener("dragleave",function(t){this.classList.remove("active")},!1),target.addEventListener("drop",function(t){var e=t.dataTransfer.files[0];pixelate(e),t.preventDefault()},!1),input.addEventListener("change",function(){var t=this.files[0];pixelate(t)},!1);