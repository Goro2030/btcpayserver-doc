const customBlock = require('markdown-it-custom-block')
const implicitFigures = require('markdown-it-implicit-figures')

const youtubeEmbed = (id, path) => `
  <div class="ytEmbed" data-id="${id}" style="background-image:url(https://img.youtube.com/vi/${id}/hqdefault.jpg);">
    <iframe
      title="YouTube ${id}"
      data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
      frameborder="0"
      allow="autoplay;encrypted-media;picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>`


module.exports = {
  title: "BTCPay Server Docs",
  description: "BTCPay Server Official Documentation",
  head: [
    // Favicon
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#51b13e" }],
    ["meta", { name: "msapplication-TileColor", content: "#0f3b21" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
    // Styles
    ["link", { rel: "stylesheet", href: "/styles/btcpayserver-variables.css" }]
  ],
  plugins: [
    ['vuepress-plugin-clean-urls', {
      normalSuffix: '/',
      indexSuffix: '/',
      notFoundPath: '/404.html',
    }],
    ['vuepress-plugin-code-copy', {
      color: '#8F979E',
      backgroundTransition: false,
      staticIcon: true
    }]
  ],
  markdown: {
    extendMarkdown (md) {
      md.use(implicitFigures)
      md.use(customBlock, {
        youtube (arg) {
          const [id, start] = arg.split(',')
          const path = start ? `${id}?start=${start}` : `${id}?`
          return youtubeEmbed(id, path)
        },
        youtubePlaylist (arg) {
          const [id, video] = arg.split(',')
          const path = `${video || ''}?listType=playlist&list=${id}`
          return youtubeEmbed(video || id, path)
        }
      })
    }
  },
  themeConfig: {
    logo: "/img/btcpay-logo.svg",
    displayAllHeaders: false,
    repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 0,
    algolia: {
      indexName: 'btcpayserver',
      apiKey: '6a3a4c4380385cb5c9f9070247fdfca6',
      // See https://www.algolia.com/doc/api-reference/api-parameters/
      algoliaOptions: {
        hitsPerPage: 25
      },
      // See https://community.algolia.com/docsearch/behavior.html#autocompleteoptions
      autocompleteOptions: {
        openOnFocus: true
      }
    },
    nav: [
      {
        text: "Website",
        link: "https://btcpayserver.org/"
      },
      {
        text: "Chat",
        link: "https://chat.btcpayserver.org/"
      },
      {
        text: "GitHub",
        link: "https://github.com/btcpayserver/",
        rel: "noopener noreferrer github"
      },
      {
        text: "Twitter",
        link: "https://twitter.com/BtcpayServer",
        rel: "noopener noreferrer twitter"
      }
    ],
    sidebar: [
      ["/", "Introduction"],
      {
        title: "BTCPay Basics",
        collapsable: false,
        children: [
          ["/UseCase", "Use Case"],
          ["/Walkthrough", "Walkthrough"],
          ["/BTCPayVsOthers", "BTCPay Server vs. Others"],
          ["/TryItOut", "Try it out"]
        ]
      },
      {
        title: "Deployment",
        collapsable: false,
        children: [
          ["/Deployment", "Choosing a Deployment Method"],
          ["/ThirdPartyHosting", "Third-party Hosting"],
          {
            title: "Docker",
            path: "/DockerDeployment",
            collapsable: false,
            children: [
              // TODO: Add Configurator
              {
                title: "Web Deployment",
                path: "/LunaNodeWebDeployment"
              },
              {
                title: "Azure Deployment",
                path: "/AzureDeployment",
                children: [
                  ["/AzurePennyPinching", "Reducing Cost on Azure"],
                  ["/ChangeDomain", "Changing domain"]
                ]
              },
              {
                title: "Google Cloud Deployment",
                path: "/GoogleCloudDeployment"
              },
              {
                title: "Hardware Deployment",
                path: "/HardwareDeployment",
                children: [
                  {
                    title: "Advanced Deployment",
                    collapsable: false,
                    children: [
                      ["/DynamicDNS", "Dynamic DNS"],
                      ["/ReverseSSHtunnel", "Reverse SSH Tunnel"]
                    ]
                  }
                ]
              },
              {
                title: "Raspberry Pi Deployment",
                path: "/RaspberryPiDeployment",
                children: [
                  "/RPi3",
                  "/RPi4"
                ]
              },
              {
                title: "Docker Plugins",
                children: [
                  {
                    title: "Transmuter",
                    path: "/Transmuter/",
                    children: [
                      ["/Transmuter/EmailReceiptsPreset", "Email Receipts Preset"]
                    ]
                  },
                  "/Docker/pihole"
                ]
              }
            ]
          },
          {
            title: "Manual Deployment",
            path: "/ManualDeployment",
            children: [
              "/ManualDeploymentExtended"
            ]
          }
        ]
      },
      {
        title: "Getting Started",
        collapsable: false,
        children: [
          "/RegisterAccount",
          "/CreateStore",
          {
            title: "(3) Connect a Wallet",
            path: "/ConnectWallet",
            collapsable: false,
            children: [
              {
                title: "Connect a hardware wallet",
                path: "/Vault",
                children: [
                  ["/LedgerWallet", "Ledger Wallet"],
                  ["/ColdCardWallet", "ColdCard Wallet"]
                ]
              },
              {
                title: "Connect a software wallet",
                children: [
                  {
                    title: "Electrum Wallet",
                    path: "/ElectrumWallet",
                    children: [
                      ["/ElectrumX", "Electrum X"],
                      ["/ElectrumPersonalServer", "Electrum Personal Server EPS"]
                    ]
                  },
                  ["/WasabiWallet", "Wasabi Wallet"]
                ]
              },
              {
                title: "Create a wallet",
                children: [
                  ["/HotWallet", "Hot Wallet"]
                ]
              }
            ]
          },
          ["/WhatsNext", "(4) What's Next?"]
        ]
      },
      {
        title: "Features",
        collapsable: false,
        children: [
          ["/Apps", "Apps"],
          ["/Wallet", "Wallet"],
          ["/Invoices", "Invoices"],
          ["/PaymentRequests", "Payment Requests"],
          ["/LightningNetwork", "Lightning Network"],
          ["/Accounting", "Accounting"],
          {
            title: "Payjoin",
            path: "/Payjoin",
            children: [
              ["/Payjoin-spec", "Payjoin Specification"]
            ]
          }
        ]
      },
      {
        title: "Integrations",
        collapsable: false,
        children: [
          ["/WooCommerce", "WooCommerce"],
          ["/Drupal", "Drupal"],
          ["/Magento", "Magento"],
          ["/PrestaShop", "PrestaShop"],
          ["/CustomIntegration", "Custom Integration"]
        ]
      },
      {
        title: "Support and Community",
        collapsable: false,
        children: [
          {
            title: "FAQ and common issues",
            path: "/FAQ",
            children: [
              ["/FAQ/FAQ-General", "General FAQ"],
              ["/FAQ/FAQ-Deployment", "Deployment FAQ"],
              ["/FAQ/FAQ-Synchronization", "Synchronization FAQ"],
              ["/FAQ/FAQ-Integrations", "Integrations FAQ"],
              ["/FAQ/FAQ-ServerSettings", "Server Settings FAQ"],
              ["/FAQ/FAQ-Stores", "Stores FAQ"],
              ["/FAQ/FAQ-Wallet", "Wallet FAQ"],
              ["/FAQ/FAQ-Apps", "Apps FAQ"],
              ["/FAQ/FAQ-LightningNetwork", "Lightning Network FAQ"],
              ["/FAQ/FAQ-Altcoin", "Altcoins FAQ"]
            ]
          },
          ["/Troubleshooting", "Troubleshooting an issue"],
          ["/Support", "Support"],
          ["/Contribute", "Contribute"],
          ["/Translate", "Translate"],
          ["/Community", "Community"]
        ]
      },
      {
        title: "Development",
        collapsable: false,
        children: [
          ["/Architecture", "Architecture"],
          ["/LocalDevelopment", "Developing Locally"],
          ["/Altcoins", "How to add an Altcoin"],
          ["/Theme", "Customizing Themes"]
        ]
      }
    ]
  }
}
