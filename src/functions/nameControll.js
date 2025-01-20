export default function nameControll(schedaName){
    const arrayName = schedaName.split(" ")
    
    console.log(arrayName)
    const regex = /^([a-zA-Z]+)(\d+)$/; // Dividi in due parti: lettere e numeri
    const match = arrayName[arrayName.length - 1].match(regex);

    if (match) {
        const word = match[1]; // Prima parte (alfabetica)
        if(word === "copia"){
            arrayName.splice(arrayName.length - 1, 1)
            let number = parseInt(match[2]); // Seconda parte (numerica)
            let newName = arrayName.join(" ") + " " + word + ++number
            let isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
            if(isPresent){
            do{
                const newArrayName = newName.split(" ")
                const newMatch = newArrayName[newArrayName.length - 1].match(regex)
                let newNumber = parseInt(newMatch[2])
                newArrayName.splice(newArrayName.length - 1, 1)
                newName = newArrayName.join(" ") + " " + word + ++newNumber
                isPresent = this.exerciseCards.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
            } while(isPresent)
                return newName;
            } else{
                return newName;
            }
        }
    } else {
        console.log('non ancora + copia1');
        return name + " copia1"
    }
}