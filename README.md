# Js Card Game

![cards](https://i.imgur.com/6TNDQam.jpg)

## What is this?

A simple card game akin to others, such as Yugioh or Gwent. Based on a more personalized theme, the cards have power, health and mana by which we calculate
their potential in battle. The player who loses all of his/her health first is defeated.

## Tech Used

- JavaScript
- HTML & CSS

## Features

- Unique cards
- Power, Health, Mana of Cards
- Drag & drop
- Personalized Theme
- Straightforward playstyle
- Extendable with more cards

## Code Example

Dragging and dropping a card.
```
function dragstartHandler(e) {
    e.dataTransfer.setData("id", e.target.id);
}

function dragoverHandler(e) {
    e.preventDefault();
    if (e.target.getAttribute("draggable") === true) {
        e.dataTransfer.dropEffect = "none";
    } else {
        e.dataTransfer.dropEffect = "all";
    }
}

function dropHandler(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    let dragged = document.getElementById(id);
    if (e.target.innerHTML.trim() !== "") {
        alert("SUWAIPA NO SWIPIN!!")
    } else {
        e.target.appendChild(dragged);
        dragged.setAttribute("draggable", "false");
        dragged.style.cursor = "not-allowed";
    }
}
```

## Contributors

[Mark Ungvari](https://github.com/MarkUngvari)<br>
[Akos Czifra](https://github.com/AkosCzifra)<br>
[Janos Krizsan](https://github.com/JanosKrizsan)
