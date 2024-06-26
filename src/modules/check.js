import { Pokemon } from "./pokemon.js";

//Determines who gets points added onto their score based on the types of Pokemon
//Checks the damage relation of type1 to type2 and vice versa
//Returns an array where:
//Index 0 is the amount of points type1 gains
//Index 1 is the amount of points type2 gains
export function checkTypes(type1, type2){
    //Run API to get info on type1
    //Do some for loops to extract how they're affected by type2

    async function damageBtwn(fighter, opponent){
        //Run API on fighter to find out how much damage goes to opponent
        console.log(fighter);
        const response = await fetch(`https://pokeapi.co/api/v2/type/${fighter}/`);
        const typeData = await response.json();

        let doubleDamage = [];
        let halfDamage = [];
        let noDamage = [];

        typeData.damage_relations.double_damage_to.forEach((type)=> {
            doubleDamage.push(type.name);
        });

        typeData.damage_relations.half_damage_to.forEach((type)=> {
            halfDamage.push(type.name);
        });

        typeData.damage_relations.no_damage_to.forEach((type)=> {
            noDamage.push(type.name);
        });

        if (doubleDamage.includes(opponent)){
            console.log("Double Damage")
            return 2;
        }else if(halfDamage.includes(opponent)){
            console.log("half Damage")
            return 0.5;
        }else if(noDamage.includes(opponent)){
            console.log("no Damage")
            return 0;
        }else {
            return 1;
        }
    }

    return [damageBtwn(type1,type2), damageBtwn(type2,type1)];
}

//Returns a promise for a Pokemon that was passed in with updated information about it's types
export async function getTypes(pokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`);
    const pokeData = await response.json();

    const types = pokeData.types;
    types.forEach((type) => {
        pokemon.addType(type.type.name);
    });

    return pokemon;

}

