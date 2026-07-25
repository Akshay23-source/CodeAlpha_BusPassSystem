import os
import random

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

class AIService:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY")
        self.is_active = GEMINI_AVAILABLE and bool(self.api_key)
        
        if self.is_active:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel('gemini-pro')
            except Exception as e:
                print(f"Error configuring Gemini model: {e}")
                self.is_active = False

    def query(self, prompt, context=None):
        if not self.is_active:
            return self._generate_mock_response(prompt, context)

        try:
            # Inject context details into the prompt
            context_str = ""
            if context:
                context_str = f"Context: Logged-in user: {context.get('email', 'N/A')}, Current Page: {context.get('page', 'Dashboard')}, Role: {context.get('role', 'rider')}.\n"
            
            full_prompt = f"{context_str}{prompt}"
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            print(f"Gemini API query failed: {e}. Falling back to mock answers.")
            return self._generate_mock_response(prompt, context)

    def _generate_mock_response(self, prompt, context=None):
        p_lower = prompt.lower()
        
        # Admin Prompts Context
        role = context.get('role', 'rider') if context else 'rider'
        if role in {'admin', 'super_admin'} or 'admin' in p_lower or 'approval' in p_lower:
            if 'approv' in p_lower:
                return (
                    "### Pending Pass Approvals\n"
                    "There are currently **3 student pass applications** pending validation review.\n"
                    "1. **Rohan Sharma** (L.N. College) - Route: Central → West Gate\n"
                    "2. **Vikram Singh** (Tech Institute) - Route: Town Hall → Airport\n\n"
                    "You can approve them directly from the **Pass Requests** dashboard tab or click the check action."
                )
            if 'revenue' in p_lower or 'finance' in p_lower:
                return (
                    "### Financial Performance Summary\n"
                    "- **Today's Revenue**: ₹8,450.00\n"
                    "- **Monthly Revenue**: ₹1,82,450.00\n"
                    "- **Default Gateways**: Razorpay active (100% cloud health)\n\n"
                    "Transaction histories can be inspected under the **Financial Audit** ledger tab."
                )
            return (
                "### Operations Assistant Console\n"
                "Session active under **Administrator Authorization**.\n"
                "- Query CPU/Disk indicators under **Cloud Monitor**.\n"
                "- Track passengers accounts lists under **Riders Database**."
            )

        # Rider Prompts Context
        if 'apply' in p_lower or 'how' in p_lower and 'pass' in p_lower:
            return (
                "### How to Apply for a Bus Pass\n"
                "Follow these step-by-step guided instructions:\n"
                "1. Click the **Apply Pass** link in the left sidebar menu.\n"
                "2. Choose your ticket tier category (e.g. *Student* or *Monthly*).\n"
                "3. Select your college or company, choose your transit route stops, and review coordinates.\n"
                "4. Upload Aadhaar proof and photo documents.\n"
                "5. Complete the checkout payment using UPI or card gateways."
            )
        
        if 'fail' in p_lower or 'payment' in p_lower:
            return (
                "### Resolving Payment Failures\n"
                "If your transaction failed but funds were deducted:\n"
                "- **UPI Gateway Timeout**: Bank gateways auto-refund failed checkouts within 24-48 hours.\n"
                "- **Saved Cards limits**: Ensure CVV code is entered correctly and domestic limits are enabled.\n"
                "- **Help Ticket**: File a priority complaint in the **Support** ticket queue for manual audit checks."
            )
        
        if 'expire' in p_lower or 'renew' in p_lower:
            return (
                "### Pass Expiry & Renewals\n"
                "Your current Bus Pass expires in **5 days**.\n"
                "- To renew, click the **Wallet Deck** sidebar menu, select your active Bus Card, and tap the auto-renewal toggles.\n"
                "- Alternatively, complete a new application once the pass expires."
            )

        if 'route' in p_lower or 'map' in p_lower or 'fast' in p_lower:
            return (
                "### Transit Route Recommendations\n"
                "Based on traffic delays and weather alerts:\n"
                "- **Fastest**: *Line 12 Express* via Ring Highway (14 mins commute time, low crowd)\n"
                "- **Cheapest**: *Metro Shuttle C* (₹12.00, high crowd)\n"
                "View stops coordinates and track animated bus markers under the **Smart Journey** map."
            )

        if 'summar' in p_lower or 'dashboard' in p_lower:
            return (
                "### Rider Activity Summary\n"
                "- **Total Trips**: 24 commutations this month\n"
                "- **Travel Savings**: ₹530.00 saved vs individual tickets\n"
                "- **Primary Route**: Line 12 Express (West Gate Stop)\n"
                "- **Card Balance**: ₹150.00 (Smart Wallet credits)"
            )

        return (
            "### SmartTransit AI Assistant\n"
            "Hello! I am your AI Copilot. I can help you navigate the transit portal:\n"
            "- Ask me about **applying or renewing passes**.\n"
            "- Ask about **failed payments** or **invoice receipts**.\n"
            "- Ask to plan routes under **Smart Journey**.\n"
            "How can I assist you today?"
        )
