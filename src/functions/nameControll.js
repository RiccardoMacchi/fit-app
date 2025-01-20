export default function nameControll(nameToControl, controllArray){
    console.log(controllArray)
    const copyName = nameToControl.trim().toLowerCase() + ' copia1'
    let isPresentCopy = controllArray.some(scheda => scheda.name.toLowerCase().includes(copyName))
    if(isPresentCopy){
        nameToControl = copyName
    }
    const arrayName = nameToControl.split(" ")
    const regex = /^([a-zA-Z]+)(\d+)$/; // Dividi in due parti: lettere e numeri
    const match = arrayName[arrayName.length - 1].match(regex);
    
    if (match) {
        const word = match[1]; // Prima parte (alfabetica)
        console.log(word)
        if(word === 'copia'){
            arrayName.splice(arrayName.length - 1, 1)
            let number = parseInt(match[2]); // Seconda parte (numerica)
            let newName = arrayName.join(" ") + " " + word + ++number
            let isPresent = controllArray.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
            if(isPresent){
                do{
                    const newArrayName = newName.split(" ")
                    const newMatch = newArrayName[newArrayName.length - 1].match(regex)
                    let newNumber = parseInt(newMatch[2])
                    newArrayName.splice(newArrayName.length - 1, 1)
                    newName = newArrayName.join(" ") + " " + word + ++newNumber
                    isPresent = controllArray.some(scheda => scheda.name.toLowerCase().includes(newName.trim().toLowerCase()))
                } while(isPresent)
                return newName;
            } else{
                return newName;
            }
        }
    } else {
        console.log('non ancora + copia1');
        return nameToControl + " copia1"
    }
}