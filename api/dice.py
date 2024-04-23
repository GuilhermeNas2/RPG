import random

class Dice:

    @staticmethod
    def rollD6(sides, qtnd):
        number = qtnd*random.randint(1,sides)        
        return number

    @staticmethod
    def rollD20():
        number = random.randint(1,20)
        return number

    @staticmethod
    def rollStats():
        nMax = 0;
        arrStats = [];
        while nMax <=3:
            number = Dice.rollD6(6,1);
            arrStats.append(number);
            nMax +=1;
        minNumber = min(arrStats);
        arrStats.remove(minNumber);
        print(arrStats)

        stats = 0
        for numbers in arrStats:
            stats += numbers 

        return stats


