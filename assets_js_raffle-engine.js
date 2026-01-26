/**
 * LUXO-RIFA CORE ENGINE v1.1.0
 * Arquitetura Profissional com Sincronização de Estado
 */
const RaffleEngine = {
    config: {
        baseChars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        mask: "XXXXX"
    },

    // 1. GERENCIAMENTO DE ESTADO (Conexão Admin -> Home)
    getSettings() {
        const defaults = {
            progress: 88,
            price: 0.60,
            raffleName: "Porsche 911 GT3 RS"
        };
        const saved = localStorage.getItem('luxo_rifa_settings');
        return saved ? JSON.parse(saved) : defaults;
    },

    saveSettings(data) {
        localStorage.setItem('luxo_rifa_settings', JSON.stringify(data));
    },

    // 2. MATEMÁTICA ALFANUMÉRICA (Seu diferencial de mercado)
    generateCode(id) {
        let n = id;
        let code = "";
        while (n > 0) {
            code = this.config.baseChars[n % 36] + code;
            n = Math.floor(n / 36);
        }
        return code.padStart(5, "0");
    },

    // 3. LÓGICA DE PERCEPÇÃO
    calculateProgress(realSales, fakeOffset) {
        const total = 1000000; 
        let display = ((parseFloat(realSales) + parseFloat(fakeOffset)) / total) * 100;
        return display > 99 ? 99.8 : display.toFixed(2);
    }
  
