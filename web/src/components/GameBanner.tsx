interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsAmount: number
}

export function GameBanner({bannerUrl, title, adsAmount}: GameBannerProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={bannerUrl} alt="" />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-o right-0'>
        <strong className='font-bold text-white block tracking-[-0.18px]'>{title}</strong>
        <span className='text-zinc-300 text-sm block'>{adsAmount} anúncio(s)</span>
      </div>
    </a>
  )
}