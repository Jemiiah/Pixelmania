function Footer() {
  return (
    <footer className="py-4 px-6 text-center text-xs text-text-tertiary border-t border-border-subtle">
      Built with{' '}
      <a
        href="https://www.gooddollar.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-500 hover:text-primary-400 transition-colors duration-150"
      >
        GoodDollar
      </a>
      {' '}on Celo
    </footer>
  )
}

export { Footer }
