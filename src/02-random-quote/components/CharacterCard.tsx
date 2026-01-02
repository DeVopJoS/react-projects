import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Share2 } from "lucide-react";
import type { Character } from "../interfaces/CharacterInterface";

type Props = {
  character: Character,
  isLikeIt: boolean,
  reacToCharacter: (id: number) => void,
}

const CharacterCard = memo(({ character, isLikeIt, reacToCharacter }: Props) => {
  return (
    <Card
      key={character.id}
      className="relative h-80 overflow-hidden rounded-2xl shadow-lg"
    >
      <img
        src={character.image}
        alt={character.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <CardContent className="relative z-10 flex h-full flex-col justify-end p-4 text-white">
        <h2 className="text-sm opacity-80">Id #{character.id}</h2>
        <p className="mb-3 text-lg font-semibold">{character.name}</p>

        <div className="flex justify-between gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
          >
            <Eye size={16} />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer" 
            onClick={() => reacToCharacter(character.id)}
          >
            <Heart size={16} fill={isLikeIt ? 'white':'transparent'} />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="bg-white/20 text-white backdrop-blur hover:bg-white/30 cursor-pointer"
          >
            <Share2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default CharacterCard;
