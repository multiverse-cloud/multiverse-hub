'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, ArrowRight, Gift } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubscribed(true)
    setLoading(false)
  }

  return (
    <section id="about" className="section-shell-lg bg-muted/30">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl shadow-emerald-950/10"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Left Content */}
            <div className="p-8 lg:p-12 xl:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-md">
                  Subscribe to our newsletter and receive exclusive deals, early access to new arrivals, and more.
                </p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4 bg-white/20 backdrop-blur rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">Thanks for subscribing!</p>
                      <p className="text-white/70">Check your email for your 10% off code</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 bg-white/10 backdrop-blur border-0 text-white placeholder:text-white/50 rounded-xl focus-visible:ring-2 focus-visible:ring-white/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="h-14 px-8 bg-white text-emerald-600 hover:bg-white/90 font-semibold rounded-xl"
                      disabled={loading}
                    >
                      {loading ? 'Subscribing...' : 'Subscribe'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                )}

                <p className="text-white/60 text-sm mt-4">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex items-center justify-center p-12">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-150" />
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative bg-white/10 backdrop-blur rounded-3xl p-8 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Gift className="h-12 w-12 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-white mb-2">10% OFF</p>
                  <p className="text-white/80">Your First Order</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
