import { clsx } from 'clsx'

type ProviderType = 'metamask' | 'valora' | 'goodwallet'

interface WalletProviderListProps {
  onSelect: (provider: ProviderType) => void
  disabled: boolean
}

const providers: { id: ProviderType; name: string; icon: string; accent: string }[] = [
  { id: 'metamask', name: 'MetaMask', icon: '\uD83E\uDD8A', accent: 'hover:border-[#f6851b] hover:shadow-[0_0_20px_rgba(246,133,27,0.3)]' },
  { id: 'valora', name: 'Valora', icon: '\uD83D\uDCF1', accent: 'hover:border-primary-500 hover:shadow-glow-primary' },
  { id: 'goodwallet', name: 'GoodWallet', icon: '', accent: 'hover:border-primary-500 hover:shadow-glow-primary' },
]

export function WalletProviderList({ onSelect, disabled }: WalletProviderListProps) {
  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(provider.id)}
          className={clsx(
            'flex items-center gap-4 rounded-lg border border-border-default bg-bg-surface px-4 py-4',
            'transition-all duration-150',
            'disabled:cursor-not-allowed disabled:opacity-50',
            provider.accent,
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-elevated text-xl">
            {provider.id === 'goodwallet' ? (
              <span className="text-sm font-bold text-primary-500">G$</span>
            ) : (
              provider.icon
            )}
          </span>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-sm font-semibold text-text-primary">{provider.name}</span>
          </div>
          <span className="text-xs font-medium text-text-secondary">Connect</span>
        </button>
      ))}
    </div>
  )
}
