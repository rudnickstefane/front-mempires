import { Box, Typography } from "@mui/material";
import { ContactsProps } from "@sr/common/types";
import { Animated } from "@sr/common/ui/motion";
import { motion } from "framer-motion";
import { Setting2, ShieldSecurity } from "iconsax-react";

export function QuickActions({ label, data }: ContactsProps) {
  const actions = [
    {
      icon: ShieldSecurity,
      label: "Segurança",
      description: "Gerenciar acesso",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Setting2,
      label: "Configurações",
      description: "Preferências",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <Animated type="container" className="mt-4">
      <Box className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            className="flex items-center gap-3 p-4 rounded-xl bg-neutral-100/70 hover:bg-neutral-200/50 transition-colors text-left group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Box
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
            </Box>
            <Box>
              <Typography className="!font-poppins !text-sm !font-medium">
                {action.label}
              </Typography>
              <Typography className="!text-xs !font-poppins !text-neutral-500">
                {action.description}
              </Typography>
            </Box>
          </motion.button>
        ))}
      </Box>
    </Animated>
  );
}
