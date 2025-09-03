import Fool from '@/svg/tarot/Fool'
import SwipeNavigation from '@/ui/SwipeNavigation'

export default function StoryScreen() {
    return (
        <SwipeNavigation>
            <div className="not-motion-reduce:animate-slidefromright relative flex flex-col items-center select-none">
                <div className="fill-gold bg-background max-h-screen">
                    <Fool />
                </div>
                <div className="absolute left-1/2 flex w-100 -translate-x-1/2 flex-col items-center gap-4 p-5">
                    <div className="text-foreground text-md rounded-lg text-center backdrop-blur-xl">
                        {
                            'As heir to the beloved Empress Reina, you have lived a life of luxury and plenty. While being royalty has its perks, you have long felt stifled by the Empress’s overbearing and critical nature, a side of her rarely seen by the adoring public.'
                        }
                    </div>
                    <div className="text-foreground text-md rounded-lg text-center backdrop-blur-xl">
                        {
                            'A week ago, the Empress departed on a diplomatic mission to a neighboring kingdom, homeland of one of your good friends. This is a unique opportunity to grow your influence in the Empire, to come into your own as a ruler and define who you are as a person. When she returns, will you fade back into your mother’s shadow, or stand as a future leader the people can believe in?'
                        }
                    </div>
                    <div className="text-foreground text-md rounded-lg text-center backdrop-blur-xl">
                        {
                            'You will bring to bear all the intrigue and trickery that brought the Empress to power, sending your agents across the capital to forge alliances and build the influence you will one day need to rule. As long as you can delay the Empress’s return, there is still time. Good luck.'
                        }
                    </div>
                </div>
            </div>
        </SwipeNavigation>
    )
}
