/**
 * LUXO-RIFA UI CONTROLLER
 * Gerenciamento de Interface e Experiência do Usuário (UX)
 */

const UIController = {
    state: {
        selectedQuantity: 100,
        pricePerTicket: 0.60,
        raffleProgress: 88.4,
        raffleName: "Porsche 911 GT3 RS"
    },

    init() {
        this.renderRaffleCard();
        this.setupEventListeners();
        this.startLiveNotifications();
    },

    // Renderiza o Card de Venda com Gatilhos de Urgência
    renderRaffleCard() {
        const container = document.getElementById('raffle-container');
        container.innerHTML = `
            <div class="glass rounded-[40px] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20 7h-9m3 3H5m12 10H5m14-3H5m12-7H5M5 20h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                </div>

                <div class="mb-10">
                    <div class="flex justify-between items-end mb-3">
                        <div>
                            <span class="block text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">Status das Cotas</span>
                            <span class="text-2xl font-black italic text-white">${this.state.raffleProgress}% <span class="text-sm text-gray-500">VENDIDO</span></span>
                        </div>
                        <div class="text-right">
                            <span class="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-black animate-pulse border border-red-500/20">
                                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span> ALTA DEMANDA
                            </span>
                        </div>
                    </div>
                    <div class="h-4 w-full bg-black/50 rounded-full border border-white/5 p-1">
                        <div class="h-full gold-gradient rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-1000" style="width: ${this.state.raffleProgress}%"></div>
                    </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    ${this.renderPackButtons()}
                </div>

                <div class="bg-black/40 rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <span class="text-[10px] text-gray-500 uppercase font-black block mb-1">Total a pagar</span>
                        <span class="text-4xl font-black text-white" id="display-total">R$ ${(this.state.selectedQuantity * this.state.pricePerTicket).toFixed(2)}</span>
                    </div>
                    <button onclick="UIController.handleCheckout()" class="w-full md:w-auto px-12 py-5 gold-gradient text-black font-black rounded-2xl uppercase tracking-widest shine-effect hover:scale-105 transition-transform active:scale-95">
                        Participar agora
                    </button>
                </div>
            </div>
        `;
    },

    renderPackButtons() {
        const packs = [
            { q: 50, label: 'Standard' },
            { q: 100, label: 'Popular', hot: true },
            { q: 500, label: 'VIP' },
            { q: 1000, label: 'Shark' }
        ];

        return packs.map(p => `
            <button onclick="UIController.updateQuantity(${p.q}, this)" 
                class="pack-option relative py-6 rounded-3xl border transition-all flex flex-col items-center group ${p.q === 100 ? 'border-yellow-500 bg-yellow-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}">
                ${p.hot ? '<span class="absolute -top-2 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase">Recomendado</span>' : ''}
                <span class="text-3xl font-black ${p.q === 100 ? 'text-yellow-500' : 'text-white'}">${p.q}</span>
                <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">${p.label}</span>
            </button>
        `).join('');
    },

    updateQuantity(q, el) {
        this.state.selectedQuantity = q;
        document.querySelectorAll('.pack-option').forEach(b => {
            b.classList.remove('border-yellow-500', 'bg-yellow-500/5');
            b.querySelector('span').classList.add('text-white');
            b.querySelector('span').classList.remove('text-yellow-500');
        });
        el.classList.add('border-yellow-500', 'bg-yellow-500/5');
        el.querySelector('span').classList.replace('text-white', 'text-yellow-500');
        
        document.getElementById('display-total').innerText = `R$ ${(q * this.state.pricePerTicket).toFixed(2)}`;
    },

    handleCheckout() {
        // Aqui simula a transição para o Checkout de alto nível
        const btn = event.target;
        btn.innerHTML = `<span class="animate-spin inline-block mr-2">◌</span> PROCESSANDO...`;
        
        setTimeout(() => {
            alert(`SISTEMA DE PAGAMENTO:\n\nCotas: ${this.state.selectedQuantity}\nValor: R$ ${(this.state.selectedQuantity * this.state.pricePerTicket).toFixed(2)}\n\nRedirecionando para o Gateway Seguro...`);
            btn.innerText = 'PARTICIPAR AGORA';
        }, 1500);
    },

    startLiveNotifications() {
        // Simulação de prova social (Vendas em tempo real)
        setInterval(() => {
            const names = ["Marcos S.", "Felipe R.", "Ana K.", "Lucas W.", "Carla P."];
            const name = names[Math.floor(Math.random() * names.length)];
            const qty = [50, 100, 500][Math.floor(Math.random() * 3)];
            console.log(`[PROVA SOCIAL]: ${name} comprou ${qty} cotas.`);
            // Aqui você pode injetar um pequeno toast/pop-up no canto da tela
        }, 15000);
    }
};

// Inicializa o controlador ao carregar a página
document.addEventListener('DOMContentLoaded', () => UIController.init());
